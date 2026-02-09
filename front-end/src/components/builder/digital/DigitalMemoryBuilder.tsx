import React, { useEffect } from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { MemoryElement } from "@/types";
import { useMemoryStore } from "@/store/useMemoryStore";
import { ElementPalette } from "./ElementPalette";
import { Canvas } from "./Canvas";

interface DigitalMemoryBuilderProps {
    initialElements?: MemoryElement[];
    onSave?: (elements: MemoryElement[]) => void;
    onChange?: (elements: MemoryElement[]) => void;
}

export function DigitalMemoryBuilder({
    initialElements = [],
    onSave,
    onChange,
}: DigitalMemoryBuilderProps) {
    // Connect to Zustand store
    const elements = useMemoryStore((state) => state.elements);
    const setElements = useMemoryStore((state) => state.setElements);
    const addElement = useMemoryStore((state) => state.addElement);
    const updateElement = useMemoryStore((state) => state.updateElement);
    const setActiveElement = useMemoryStore((state) => state.setActiveElement);
    const activeElementId = useMemoryStore((state) => state.activeElementId);

    // Initialize store with initial props only once on mount or when strict equality changes
    // Ideally, we want to respect the parent's control if it resets.
    useEffect(() => {
        if (initialElements.length > 0) {
            setElements(initialElements);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync store changes back to parent
    useEffect(() => {
        onChange?.(elements);
    }, [elements, onChange]);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveElement(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveElement(null);

        if (!over) return;

        // Handle dropping new item from palette
        if (active.data.current?.isNew) {
            const type = active.data.current.type;
            const content = active.data.current.content || "Text";

            const newElement: MemoryElement = {
                id: `element-${Date.now()}`,
                type,
                content,
                position: { x: 100, y: 100 }, // Default drop position
                size: { width: 100, height: 100 },
            };

            addElement(newElement);
            return;
        }

        // Handle moving existing item
        const elementId = active.id as string;
        const element = elements.find((el) => el.id === elementId);

        if (element) {
            const deltaX = event.delta.x;
            const deltaY = event.delta.y;

            updateElement(elementId, {
                position: {
                    x: element.position.x + deltaX,
                    y: element.position.y + deltaY,
                },
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex h-[calc(100vh-200px)] border rounded-xl overflow-hidden bg-gray-50">
                <ElementPalette />
                <div className="flex-1 p-8 overflow-auto">
                    <Canvas elements={elements} />
                </div>
            </div>
            <DragOverlay>
                {activeElementId ? (
                    <div className="bg-white p-2 border border-blue-500 rounded shadow-lg">
                        Dragging...
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
