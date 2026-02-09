import { create } from 'zustand';
import { MemoryElement } from '@/types';

// State defining the collaborative document
interface MemoryDocumentState {
    elements: MemoryElement[];
    activeElementId: string | null;
    // Metadata for collaboration
    collaborators: { id: string; name: string; color: string; cursor?: { x: number; y: number } }[];
}

// Actions that can be performed
interface MemoryActions {
    // Local UI Actions
    setActiveElement: (id: string | null) => void;

    // Document Actions (Synced)
    addElement: (element: MemoryElement) => void;
    updateElement: (id: string, updates: Partial<MemoryElement>) => void;
    removeElement: (id: string) => void;
    setElements: (elements: MemoryElement[]) => void;

    // Collaboration Actions
    updateCursor: (userId: string, position: { x: number; y: number }) => void;
    addCollaborator: (user: { id: string; name: string; color: string }) => void;
    removeCollaborator: (userId: string) => void;
}

export const useMemoryStore = create<MemoryDocumentState & MemoryActions>((set) => ({
    // Initial State
    elements: [],
    activeElementId: null,
    collaborators: [],

    // Actions
    setActiveElement: (id) => set({ activeElementId: id }),

    addElement: (element) =>
        set((state) => ({
            elements: [...state.elements, element]
            // In a real-time app, you would emit: socket.emit('element:add', element)
        })),

    updateElement: (id, updates) =>
        set((state) => ({
            elements: state.elements.map((el) =>
                el.id === id ? { ...el, ...updates } : el
            ),
            // In a real-time app, you would emit: socket.emit('element:update', { id, updates })
        })),

    removeElement: (id) =>
        set((state) => ({
            elements: state.elements.filter((el) => el.id !== id),
            // In a real-time app, you would emit: socket.emit('element:remove', id)
        })),

    setElements: (elements) => set({ elements }),

    updateCursor: (userId, position) =>
        set((state) => ({
            collaborators: state.collaborators.map((c) =>
                c.id === userId ? { ...c, cursor: position } : c
            ),
        })),

    addCollaborator: (user) =>
        set((state) => ({
            collaborators: [...state.collaborators, user],
        })),

    removeCollaborator: (userId) =>
        set((state) => ({
            collaborators: state.collaborators.filter((c) => c.id !== userId),
        })),
}));
