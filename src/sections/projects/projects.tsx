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
      <div className="px-4 md:px-12">
        <div className="grid items-start gap-2">
          <div className="space-y-2 px-6 pb-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl lg:text-4xl/none">
              My Projects
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Here are some of my projects where I&apos;ve turned code into
              cool, functional stuff.
            </p>
          </div>
          <div className="flex items-center justify-center overflow-hidden">
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
                    className="md:basis-1/4 lg:basis-1/4	xl:basis-1/4"
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
