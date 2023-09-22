"use client";
import { FC, useEffect, useRef, useState } from "react";
import Tag from "./Tag";
import { ITag } from "../types/types";

interface TagSliderProps {
  tags: ITag[];
  onChange?: (tags: ITag[]) => any;
}

const tags = [
  {
    id: "1",
  },
];

const TagSlider: FC<TagSliderProps> = ({ tags, onChange }) => {
  const [offset, setOffset] = useState(0);

  const [tagClicked, setTagClicked] = useState("");

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const sliderRef: React.RefObject<HTMLDivElement> = useRef(null);

  const [isMouseDown, setMouseDown] = useState(false);

  const changeOffset = (newOffset: number) => {
    if (newOffset < 0) return setOffset(0);

    if (
      !sliderRef.current ||
      sliderRef.current.children[0].clientWidth < sliderRef.current.clientWidth
    )
      return;

    const offsetMax =
      sliderRef.current.children[0].clientWidth -
      sliderRef.current.clientWidth -
      10;

    setOffset(newOffset > offsetMax ? offsetMax : newOffset);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    setMouseDown(true);

    if (!sliderRef.current || !e.target.parentElement) return;

    if (
      e.target.parentElement.dataset.tagname &&
      sliderRef.current.contains(e.target)
    ) {
      setTagClicked(e.target.parentElement.dataset.tagname);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) changeOffset(offset - e.movementX);
    setTagClicked("");
  };

  const handleMouseUp = () => {
    setMouseDown(false);

    if (tagClicked) {
      if (selectedTags.indexOf(tagClicked) == -1) {
        setSelectedTags([...selectedTags, tagClicked]);
      } else {
        setSelectedTags(selectedTags.filter((tag) => tag != tagClicked));
      }
    }
  };

  const handleMouseLeave = () => {
    setMouseDown(false);
  };

  const handleSelectAll = () => {
    setSelectedTags([]);
  };

  const handleClickArrowLeft = () => {
    if (!sliderRef.current) return;

    if (offset - sliderRef.current.clientWidth > 0) {
      setOffset(offset - sliderRef.current.clientWidth);
    } else {
      setOffset(0);
    }
  };

  const handleClickArrowRight = () => {
    if (
      !sliderRef.current ||
      sliderRef.current.children[0].clientWidth < sliderRef.current.clientWidth
    )
      return;

    if (
      offset + sliderRef.current.clientWidth <
      sliderRef.current.children[0].clientWidth - sliderRef.current.clientWidth
    ) {
      setOffset(offset + sliderRef.current.clientWidth);
    } else {
      setOffset(
        sliderRef.current.children[0].clientWidth -
          sliderRef.current.clientWidth -
          10,
      );
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(tags.filter((tag) => selectedTags.includes(tag.name)));
    }
  }, [selectedTags]);

  return (
    <div className="relative px-10">
      <div
        className="flex overflow-hidden"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <ul
          className="flex"
          style={{
            marginLeft: -offset + "px",
            transition: isMouseDown ? "none" : "margin-left 0.3s",
          }}
        >
          <li className="mr-3 list-none" onClick={handleSelectAll}>
            <Tag selected={!selectedTags.length} className="transition-all">
              Все
            </Tag>
          </li>
          {tags.map((tag) => (
            <li key={tag.id} className="mr-3 list-none" data-tagname={tag.name}>
              <Tag
                selected={selectedTags.indexOf(tag.name) != -1}
                className="transition-all"
              >
                {tag.name}
              </Tag>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="absolute left-0 top-[calc(50%-15px)] h-[30px] w-[20px] rotate-180 cursor-pointer bg-[url('/arrow-right-black.svg')] bg-contain bg-no-repeat"
        onClick={handleClickArrowLeft}
        data-testid="tag-slider-arrow-left"
      />
      <button
        className="absolute right-0 top-[calc(50%-15px)] h-[30px] w-[20px] cursor-pointer bg-[url('/arrow-right-black.svg')] bg-contain bg-no-repeat"
        onClick={handleClickArrowRight}
        data-testid="tag-slider-arrow-right"
      />
    </div>
  );
};

export default TagSlider;
