import { RefObject, useRef, useState } from "react";
import { useDraftTeamsStore } from "../../../entities/Team/model";
import { formatNameShort } from "../../../entities/Student";

const notDraggedState = {
  isDragged: false,
  from: {
    teamIndex: -1,
    studentIndex: -1,
  },
  to: {
    teamIndex: -1,
    studentIndex: -1,
  },
  x: -1,
  y: -1,
  width: -1,
};

export const useDnD = () => {
  const dragRef = useRef<HTMLElement | null>(null);

  const dragInfo = useRef(notDraggedState);
  const [draggedTo, setDraggedTo] = useState({
    teamIndex: -1,
    studentIndex: -1,
  });

  const { teams, moveStudent } = useDraftTeamsStore();

  const handleDragStart = (e: React.MouseEvent) => {
    const studentListElements = e.currentTarget.querySelectorAll("ul");

    // Check if the element is marked as draggable
    if (e.target instanceof HTMLElement && e.target.dataset.drag) {
      // Find the dragged element's team index using DOM
      Array.from(e.currentTarget.children).forEach((child, index) => {
        if (e.target == child || child.contains(e.target as HTMLElement)) {
          const box = (e.target as HTMLElement).getBoundingClientRect();

          // Find the studentIndex by name
          const fromStudentIndex = teams[index].students.findIndex(
            (student) =>
              formatNameShort(student.name) ==
              (e.target as HTMLElement).innerHTML
          );

          dragInfo.current = {
            isDragged: false,
            from: {
              teamIndex: index,
              studentIndex: fromStudentIndex,
            },
            to: {
              teamIndex: index,
              studentIndex: fromStudentIndex,
            },
            x: box.left,
            y: box.top,
            width: child.clientWidth,
          };

          dragRef.current = e.target as HTMLElement;
        }
      });
    }

    // Calculate all of the students'coordinates when dragging starts
    const positions = Array.from(e.currentTarget.children).map(
      (team, index) => {
        const teamRect = team.getBoundingClientRect();

        return {
          left: teamRect.left,
          right: teamRect.right,
          top: teamRect.top,
          bottom: teamRect.bottom,
          students: Array.from(studentListElements[index].children).map(
            (ref) => {
              if (!ref) return null;
              const refRect = ref?.getBoundingClientRect();

              return refRect;
            }
          ),
        };
      }
    );

    const handleDrag = (e: MouseEvent) => {
      // Find the hovered team index
      const newToTeamIndex = positions.findIndex((teamRect) => {
        if (
          dragInfo.current.x > teamRect.left &&
          dragInfo.current.x < teamRect.right &&
          dragInfo.current.y > teamRect.top &&
          dragInfo.current.y < teamRect.bottom
        )
          return true;

        return false;
      });

      // Find the hovered student's index (only vertical axis matters)
      const newToStudentIndex =
        newToTeamIndex == -1
          ? -1
          : positions[newToTeamIndex].students.findIndex((rect) => {
              if (!rect) return false;

              return dragInfo.current.y < rect.top;
            });

      dragInfo.current = {
        isDragged: true,
        from: dragInfo.current.from,
        to: {
          teamIndex: newToTeamIndex,
          studentIndex:
            newToStudentIndex == -1 && newToTeamIndex != -1
              ? positions[newToTeamIndex].students.length // Place the dragged element at the end of the list
              : newToStudentIndex,
        },
        x: dragInfo.current.x + e.movementX,
        y: dragInfo.current.y + e.movementY,
        width: dragInfo.current.width,
      };

      if (
        dragInfo.current.from.teamIndex == dragInfo.current.to.teamIndex &&
        dragInfo.current.from.studentIndex < dragInfo.current.to.studentIndex
      )
        dragInfo.current.to.studentIndex -= 1; // kinda felt more intuitive that way

      if (
        dragInfo.current.from.teamIndex != draggedTo.teamIndex ||
        dragInfo.current.from.studentIndex != draggedTo.studentIndex
      ) {
        if (
          dragInfo.current.from.teamIndex == dragInfo.current.to.teamIndex &&
          dragInfo.current.from.studentIndex == dragInfo.current.to.studentIndex
        ) {
          setDraggedTo({ teamIndex: -1, studentIndex: -1 });
        } else {
          if (
            dragInfo.current.from.teamIndex == dragInfo.current.to.teamIndex &&
            dragInfo.current.from.studentIndex <
              dragInfo.current.to.studentIndex
          ) {
            setDraggedTo({
              teamIndex: dragInfo.current.to.teamIndex,
              studentIndex: dragInfo.current.to.studentIndex + 1,
            }); // For UI to update the drop spot
          } else {
            setDraggedTo(dragInfo.current.to); // For UI to update the drop spot
          }
        }
      }

      if (dragRef.current) {
        dragRef.current.style.position = "fixed";
        dragRef.current.style.top = dragInfo.current.y + "px";
        dragRef.current.style.left = dragInfo.current.x + "px";
        dragRef.current.style.width = dragInfo.current.width - 64 + "px"; // parent has 32px padding on both sides, idk why it affects this
        dragRef.current.style.zIndex = "100";
      }
    };

    const handleDragStop = () => {
      if (
        (dragInfo.current.from.teamIndex != dragInfo.current.to.teamIndex ||
          dragInfo.current.from.studentIndex !=
            dragInfo.current.to.studentIndex) &&
        dragInfo.current.to.teamIndex != -1 &&
        dragInfo.current.to.studentIndex != -1
      ) {
        moveStudent(dragInfo.current.from, dragInfo.current.to);
      }

      dragInfo.current = notDraggedState;

      if (dragRef.current) dragRef.current.removeAttribute("style");

      setDraggedTo({ teamIndex: -1, studentIndex: -1 });

      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragStop);
    };

    if (dragInfo.current.from.teamIndex != -1) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("mouseup", handleDragStop);
    }
  };

  return { dragInfo, draggedTo, handleDragStart };
};
