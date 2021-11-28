import React from 'react'
import { Link } from 'react-router-dom'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td><Link to={`project/${project.id}`}>{project.name}</Link></td>
            <td>{project.rep_url}</td>
            <td>{project.users}</td>
        </tr>
   )
}

const ProjectList = ({projects}) => {
   return (
       <table>
           <th>ID</th>
           <th>Name</th>
           <th>Repository</th>
           <th>Users</th>
           {projects.map((project) => <ProjectItem project={project} />)}
       </table>
   )
}

export default ProjectList
