/* eslint-disable no-await-in-loop */
export default class AppModel {
  constructor(state) {
    this.state = state;
  }

  static async addMovieRating(data) {
    const moviesData = data.Search;
    if (moviesData !== undefined) {
      for (let j = 0; j < moviesData.length; j += 1) {
        const id = moviesData[j].imdbID;
        const url = `https://www.omdbapi.com/?i=${id}&apikey=79979921`;
        const response = await fetch(url);
        const result = await response.json();
        moviesData[j].rating = result.imdbRating;
      }
    }
    return moviesData;
  }

  async getMovieTitles() {
    try {
      const { url } = this.state;
      const response = await fetch(url);
      const data = await response.json();
      return AppModel.addMovieRating(data);
    } catch (err) {
      return window.console.log(err);
    }
  }
}
