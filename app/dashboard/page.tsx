import React from "react";
import CreateProjectModal from "./(components)/CreateProjectModal";
import ProjectList from "./(components)/ProjectList";

const page = () => {
  return (
    <div className="relative w-full min-h-screen">
      <CreateProjectModal />
      <ProjectList />
    </div>
  );
};

export default page;
