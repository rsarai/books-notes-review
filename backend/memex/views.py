from django.views import generic


class ActiveDetailView(generic.TemplateView):
    template_name = "spa.html"
