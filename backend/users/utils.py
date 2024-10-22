from email.mime.image import MIMEImage

from django.contrib.auth.tokens import default_token_generator
from django.core.mail import get_connection, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from amster_flora.settings import EMAIL_HOST_USER, FE_URL
from users.tasks import send_email


class EmailSender:
    from_email = EMAIL_HOST_USER
    frontend_url = FE_URL
    logo_path = 'users/templates/logo.png'
    icon_path = 'users/templates/icon.png'
    logo_file_name = 'logo.png'
    icon_file_name = 'icon.png'

    @staticmethod
    def get_item_sum(order_item):
        return order_item.amount * order_item.price - order_item.discount

    @staticmethod
    def email_send(subject, message, from_email, recipient_list, html_message, fail_silently=False, files_path: list = None):
        connection = get_connection(fail_silently=fail_silently)
        mail = EmailMultiAlternatives(subject, message, from_email, recipient_list, connection=connection)
        mail.attach_alternative(html_message, 'text/html')
        mail.content_subtype = 'html'
        mail.mixed_subtype = 'related'
        if files_path:
            for file in files_path:
                with open(file, 'rb') as f:
                    filename = str(file).split('/')[-1]
                    img = MIMEImage(f.read(), _subtype='png')
                    img.add_header('Content-ID', f'{filename}')
                    img.add_header('Content-Disposition', 'inline', filename=img.get_filename())
                    mail.attach(img)
        return mail.send()

    def get_uuid_token_url(self, request, obj_user):
        uidb64 = urlsafe_base64_encode(force_bytes(obj_user.id))
        token = default_token_generator.make_token(obj_user)
        http = request.is_secure()
        http = 'https://' if http else 'http://'
        return ''.join([http, self.frontend_url, '/password-reset/', uidb64, '/', token, '/'])

    def send_email_reset_password(self, request, obj_user, fail_silently=False):
        context = {
            'title': 'Скидання паролю',
            'invite_url': self.get_uuid_token_url(request, obj_user),
            'file_name': self.logo_file_name,
        }
        html = render_to_string('password-reset.html', context=context, request=request)
        send_email.delay(
            subject=context['title'],
            message=None,
            from_email=self.from_email,
            recipient_list=[obj_user.email],
            fail_silently=fail_silently,
            html_message=html,
            files_path=[self.logo_path, self.icon_path],
        )
        return True

    def send_email_new_user(self, request, obj_user, fail_silently=False):
        context = {
            'title': 'Реєстрація у веб-шопі Amster Flora',
            'user_name': obj_user.get_full_name(),
            'file_name': self.logo_file_name,
        }
        html = render_to_string('registration.html', context=context, request=request)
        send_email.delay(
            subject=context['title'],
            message=None,
            from_email=self.from_email,
            recipient_list=[obj_user.email],
            fail_silently=fail_silently,
            html_message=html,
            files_path=[self.logo_path, self.icon_path],
        )
        return True

    def send_email_invite_new_user(self, request, obj_user, fail_silently=False):
        second_discount = 0
        if obj_user.bonus_program:
            bonus_limit = obj_user.bonus_program.limits.all().order_by('-accumulation_limit').first()
            second_discount = bonus_limit.discount if bonus_limit else 0
        context = {
            'title': 'Підтвердження реєстрації у веб-шопі Amster Flora',
            'user_name': obj_user.get_full_name(),
            'second_discount': second_discount,
            'invite_url': self.frontend_url,
            'file_name': self.logo_file_name,
        }
        html = render_to_string('account-activation.html', context=context, request=request)
        send_email.delay(
            subject=context['title'],
            message=None,
            from_email=self.from_email,
            recipient_list=[obj_user.email],
            fail_silently=fail_silently,
            html_message=html,
            files_path=[self.logo_path],
        )
        return True
