import React from "react";

interface DisplayTagsProps {
  tags: string[];
}

function DisplayTags({ tags }: DisplayTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.length > 0 &&
        tags.map((tag, index) => {
          if(tag === "" || tag === " " || tag === null || tag === undefined) return null
          return (
            <span className="badge badge-neutral" key={index}>
              {tag}
            </span>
          );
        })}
    </div>
  );
}

export default DisplayTags;
