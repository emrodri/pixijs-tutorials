export const preloadResources = (resources, app) => {
  app.loader.baseUrl = 'assets';
  resources.forEach((r) => app.loader.add(r.name, r.resource));
  app.loader.onProgress.add(handleProgress);
  app.loader.onComplete.add(handleDoneLoading);
  app.loader.onError.add(handleLoadingError);
  return app.loader;
};

const handleProgress = (e) => console.log(e.progress);

const handleDoneLoading = (e) => console.log('Done Loading');

const handleLoadingError = (e) => console.log('Error' + e.message);
