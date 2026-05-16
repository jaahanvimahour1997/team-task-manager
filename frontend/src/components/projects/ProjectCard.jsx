export default function ProjectCard({ project }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg">
        {project.name}
      </h2>

      <p className="text-gray-500 text-sm">
        {project.description}
      </p>
    </div>
  );
}