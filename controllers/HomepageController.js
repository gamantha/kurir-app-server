export default class MailController {
  sendWorksPage(req, res) {
    res.sendFile('how-works.html', { root: 'views/articles/' });
  }
}
