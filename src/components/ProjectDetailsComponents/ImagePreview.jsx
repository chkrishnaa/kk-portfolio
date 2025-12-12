import PreviewBox, { Github, Open } from "../Cards/PreviewBox";

const ImagePreview = ({ project, isDarkMode }) => {
  return (
    <div className="flex w-full flex-col justify-between gap-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Live Demo:</h1>

        <PreviewBox
          project={project}
          isDarkMode={isDarkMode}
          liveUrl={project.liveUrl}
          Open={Open}
        />
      </div>

      <div>
        <h1 className="text-2xl font-semibold mb-2">Github:</h1>

        <PreviewBox
          project={project}
          isDarkMode={isDarkMode}
          githubUrl={project.githubUrl}
          Github={Github}
        />
      </div>
    </div>
  );
};

export default ImagePreview;
