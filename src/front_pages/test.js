{
  allProjectsData.length === 0 ? (
    <p>Loading...</p>
  ) : (
    allProjectsData.map(
      ({
        id,
        project_number,
        title,
        description,
        tech,
        video,
        uiux,
        code,
        website,
        image,
      }
      ) => (
        <div className="card-group" key={id}>
          <div className="card" >
            <div className="content">
              <h1>{title}</h1>
              <h3>Image</h3>
              <p>{description}</p>
              <h3>{tech}</h3>
            </div>
            <button>View</button>
          </div>
        </div>
      )
    ))
}


