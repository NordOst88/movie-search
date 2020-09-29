import AppModel from './AppModel';

describe('AppMode.extractMovieTitles', () => {
  it('Should be instance of Function', () => {
    expect(AppModel.addMovieRating).toBeInstanceOf(Function);
  });
  it('Should return array of movie titles from input object Search key value', () => {
    const state = { URL: 'test1' };
    const model = new AppModel(state);
    expect(model.state).toEqual({ URL: 'test1' });
  });
});
