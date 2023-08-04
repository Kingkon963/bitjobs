import React from "react";

interface DisplayTagsProps {
  tags: string[];
  onClickOnTag?: (index: number) => void;
}

function DisplayTags({ tags, onClickOnTag }: DisplayTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.length > 0 &&
        tags.map((tag, index) => {
          if (tag === "" || tag === " " || tag === null || tag === undefined)
            return null;
          return (
            <span
              className="badge badge-neutral cursor-pointer"
              key={index}
              onClick={() => {
                if (onClickOnTag) onClickOnTag(index);
              }}
            >
              {tag}
            </span>
          );
        })}
    </div>
  );
}

export default DisplayTags;
