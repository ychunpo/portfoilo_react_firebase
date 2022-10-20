<Route path="/admin" element={<ProtectedRouter><Layout /></ProtectedRouter>}>
  <Route path="dashboard" element={<ProtectedRouter><Dashboard /></ProtectedRouter>} />
  <Route path="skills" element={<ProtectedRouter><AdminSkillsView /></ProtectedRouter>} />
  <Route path="projects" element={<ProtectedRouter><AdminProjectsView /></ProtectedRouter>} />
  <Route path="project/:type" element={<ProtectedRouter><AdminProjectForm /></ProtectedRouter>} />
  <Route path="project/edit/:id" element={<ProtectedRouter><AdminProjectForm /></ProtectedRouter>} />
</Route>