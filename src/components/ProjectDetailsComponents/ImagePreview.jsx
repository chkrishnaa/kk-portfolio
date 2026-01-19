import PreviewBox, { Github, Open } from "../Cards/PreviewBox";

const ImagePreview = ({ project, isDarkMode }) => {
  return (
    <div className="flex w-full flex-col justify-between gap-8 min-w-0">
      <div className="w-full min-w-0">
        <h1 className="text-2xl font-semibold mb-2">Live Demo:</h1>

        <div className="w-full min-w-0 overflow-hidden">
          <PreviewBox
            project={project}
            isDarkMode={isDarkMode}
            liveUrl={project.liveUrl}
            Open={Open}
          />
        </div>
      </div>

      <div className="w-full min-w-0">
        <h1 className="text-2xl font-semibold mb-2">Github:</h1>

        <div className="w-full min-w-0 overflow-hidden">
          <PreviewBox
            project={project}
            isDarkMode={isDarkMode}
            githubUrl={project.githubUrl}
            Github={Github}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
