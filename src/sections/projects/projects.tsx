import React, { useRef } from 'react';

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
import { useIntersectionObserver } from '@uidotdev/usehooks';

function Projects() {
  const [ref, intersection] = useIntersectionObserver({ threshold: 0.95 });
  
  return (
    // TODO: Organize projects by market type: gaming, ai, ui/ux
    // TODO: On hover project card change other images
    <MotionWrap className="w-full pb-24" id="projects">
      <div className="md:px-12">
        <div className="flex flex-col xl:items-start">
          <h2 className="pl-6 pr-8 pt-4 pb-2 bg-gray-200/25 dark:bg-yellow-600/5 drop-shadow-xl xl:ml-3 text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl lg:text-4xl/none rounded-t-lg">
            Projects I have been involved with
          </h2>
          <div ref={ref} className="flex basis-full items-center justify-center overflow-hidden bg-gray-200/25 dark:bg-yellow-600/5 px-16 pt-6 pb-8 mx-3 rounded-b-lg rounded-r-lg">
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
                        isVisible={intersection?.isIntersecting}
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
