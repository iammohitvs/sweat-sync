import React from "react";
import { Calendar, ClipboardPen, PlusCircle, Dumbbell } from "lucide-react";

const Icon = ({ iconName }: { iconName: string }) => {
    if (iconName == "") return null;
    if (iconName == "Calendar") return <Calendar />;
    if (iconName == "ClipBoardPen") return <ClipboardPen />;
    if (iconName == "PlusCircle") return <PlusCircle />;
    if (iconName == "Dumbbell") return <Dumbbell />;
};

export default Icon;
