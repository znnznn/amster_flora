from email.mime.image import MIMEImage

from django.core.mail import get_connection, EmailMultiAlternatives


def send_email(subject, message, from_email, recipient_list, html_message, fail_silently=False, files_path:list=None):
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
