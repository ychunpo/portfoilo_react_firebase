// useEffect(() => {
//   if (errors
//     && Object.keys(errors).length === 0
//     && Object.getPrototypeOf(errors) === Object.prototype) {
//     return;
//   } else { console.log('errors', errors); }
// }, [])

setProjectData(previousState => {
  return { ...previousState, coverImagePath: getCoverImagePath };
});

