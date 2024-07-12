'use client';

import React from 'react';
import { CardContent, CardFooter, Card } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';

import Link from 'next/link';
import Image from 'next/image';
import { GithubIcon, GlobeIcon, InfoIcon } from 'lucide-react';

import { Project } from '@/types/project';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { cn } from '@/utility/tailwind-utils';
import styles from './styles.module.scss';
import { useMobile } from '@/hooks/useMobile';

interface ProjectCardProps extends Project {
  className?: string;
}

function ProjectCard({
  name,
  description,
  thumbnail,
  slug,
  className
}: ProjectCardProps) {
  const { mobile, tablet } = useMobile();

  return (
    <Card
      className={cn(
        'flex flex-col justify-between bg-muted/40',
        className
      )}
    >
      <CardContent>
        <Image
          src={thumbnail || '/placeholder.svg'}
          alt={`Image of ${name}`}
          sizes="100vw"
          width={500}
          height={300}
          className={`${!mobile && !tablet ? styles.portfolio_image : ''} h-48 w-full rounded-md rounded-b-none border-b-2 object-cover`}
        />
        <div className="block relative p-2 h-28 justify-center">
          <h3 className="px-3 text-xl font-bold">{name}</h3>
          <p className="px-3 text-sm text-gray-500 dark:text-gray-400">
            {description || ''}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="z-[2] rounded-full border bg-muted hover:bg-foreground/10 absolute right-2 top-2"
                  asChild
                >
                  <Link href={'/projects/' + slug}>
                    <InfoIcon />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More Details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      {/* TODO: gradient decal as shadow to these cards? grungey like */}
    </Card>
  );
}

export default ProjectCard;
