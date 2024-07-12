import React from 'react';

import MotionWrap from '@/components/motion-wrap';
import ProjectCard from './project-card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { projects } from './config';

function Projects() {
  return (
    // TODO: Organize projects by market type: gaming, ai, ui/ux
    // TODO: On hover project card change other images
    <MotionWrap className="w-full pb-24" id="projects">
      <div className="md:px-12">
        <div className="flex flex-col xl:items-start gap-2">
          <h2 className="pl-6 pr-8 py-2 bg-gray-200/25 dark:bg-gray-600/25 drop-shadow-xl rounded-sm xl:ml-3 text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl lg:text-4xl/none">
            Projects I have been involved with
          </h2>
          <div className="flex basis-full items-center justify-center overflow-hidden bg-gray-200/25 dark:bg-yellow-600/5 px-16 py-4 mx-3 rounded-xl">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {projects.map((project, index) => (
                  <CarouselItem
                    key={index}
                    className="lg:basis-1/4	xl:basis-1/4"
                  >
                    <div className="h-full" key={index}>
                      <ProjectCard
                        name={project.name}
                        slug={project.slug}
                        description={project.description}
                        thumbnail={project.thumbnail}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </MotionWrap>
  );
}

export default Projects;
