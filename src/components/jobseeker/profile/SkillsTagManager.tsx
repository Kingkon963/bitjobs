import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DisplayTags from "@components/common/DisplayTags";
import React from "react";

interface SkillsTagManagerProps {
  onChange?: (skills: string[]) => void;
}

function SkillsTagManager({ onChange }: SkillsTagManagerProps) {
  const [skillField, setSkillField] = React.useState<string>("");
  const [skills, setSkills] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (onChange) onChange(skills);
  }, [onChange, skills]);

  const handleDelete = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newSkills = [...skills];
    newSkills.push(skillField);
    setSkills(newSkills);
    setSkillField("");
  };

  return (
    <div>
      <p className="text-justify text-gray-500">
        Add highlighted skills that you think you used while doing this Job
      </p>
      {skills.length !== 0 && (
        <div className="my-8">
          <DisplayTags
            tags={skills}
            onClickOnTag={(indx) => handleDelete(indx)}
          />
        </div>
      )}
      {skills.length > 0 && (
        <p className="text-justify text-gray-500 text-xs">Click on tags to delete</p>
      )}
      <div className="flex gap-4 mt-4">
        <Input
          placeholder="Add Skills"
          type="text"
          name="skill"
          value={skillField}
          onChange={(e) => setSkillField(e.target.value)}
          autoComplete="off"
        />
        <Button onClick={handleSubmit}>Add</Button>
      </div>
    </div>
  );
}

export default SkillsTagManager;
