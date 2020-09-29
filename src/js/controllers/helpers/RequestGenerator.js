export default class RequestGenerator {
  constructor(request, page) {
    this.request = request;
    this.page = page;
  }

  extractURL() {
    return { url: `https://www.omdbapi.com/?s=${this.request}&page=${this.page}&apikey=79979921` };
  }
}
