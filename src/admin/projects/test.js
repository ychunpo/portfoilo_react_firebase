allProjectsData.map(
  ({
    id,
    rank,
    title,
    description,
    use,
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
          <p>{description}</p>
          <h3>{use}</h3>
        </div>
        <div>
          <Link to={`/admin/project/edit/${id}`}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
)