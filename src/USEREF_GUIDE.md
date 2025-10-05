# useRef Guide for React Goal Project

## What is useRef?

`useRef` is a React Hook that returns a mutable ref object whose `.current` property is initialized to the passed argument. It persists across re-renders and doesn't trigger re-renders when changed.

## Key Benefits

### 1. **Direct DOM Access**
- Access DOM elements without state
- Focus management, scroll control
- Direct manipulation without re-renders

### 2. **Performance Optimization**
- Store values that don't need to trigger re-renders
- Avoid unnecessary component updates
- Store previous values for comparison

### 3. **Timer and Animation Management**
- Store timer IDs for cleanup
- Manage animations and intervals
- Prevent memory leaks

### 4. **Form Handling**
- Direct form element access
- Validation and focus control
- Better user experience

## Examples in Your Project

### 1. Focus Management (`AddProjectForm.tsx`)
```typescript
const nameInputRef = useRef(null);

// Focus input on validation error
nameInputRef.current?.focus();

// Focus after successful submission
nameInputRef.current?.focus();
```

### 2. Scroll Control (`ListComponent.tsx`)
```typescript
const scrollContainerRef = useRef(null);
const scrollToTopRef = useRef(null);

// Smooth scrolling
scrollToTopRef.current?.scrollIntoView({ behavior: 'smooth' });
```

### 3. Timer Management (`TimerComponent.tsx`)
```typescript
const intervalRef = useRef<NodeJS.Timeout | null>(null);

// Start timer
intervalRef.current = setInterval(() => {
    // Timer logic
}, 1000);

// Cleanup
clearInterval(intervalRef.current);
```

### 4. Previous Value Tracking (`usePrevious.ts`)
```typescript
export const usePrevious = <T>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};
```

### 5. Render Count Tracking (`UseRefExamples.tsx`)
```typescript
const renderCountRef = useRef(0);
renderCountRef.current += 1; // Doesn't cause re-render
```

## When to Use useRef

### ✅ Use useRef for:
- Direct DOM element access
- Storing timer IDs, intervals
- Previous value tracking
- Focus management
- Scroll control
- Animation references
- Values that don't need to trigger re-renders

### ❌ Don't use useRef for:
- Values that should trigger re-renders (use useState)
- Computed values (use useMemo)
- Side effects (use useEffect)
- Event handlers (use useCallback)

## Common Patterns

### 1. **DOM Element Reference
```typescript
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();
```

### 2. **Timer Management
```typescript
const timerRef = useRef<NodeJS.Timeout | null>(null);
timerRef.current = setTimeout(() => {}, 1000);
clearTimeout(timerRef.current);
```

### 3. **Previous Value Tracking
```typescript
const prevValueRef = useRef(value);
useEffect(() => {
    prevValueRef.current = value;
});
```

### 4. **Render Count
```typescript
const renderCountRef = useRef(0);
renderCountRef.current += 1;
```

## Best Practices

1. **Always clean up timers and intervals**
2. **Use TypeScript for better type safety**
3. **Check if ref.current exists before using**
4. **Don't use refs for values that should trigger re-renders**
5. **Use refs for imperative operations, state for declarative**

## Navigation

Visit `/useref-examples` in your app to see all examples in action!

## Files Created/Modified

- `src/components/AddProjectForm.tsx` - Form with focus management
- `src/components/ListComponent.tsx` - Scroll control
- `src/components/TimerComponent.tsx` - Timer management
- `src/components/UseRefExamples.tsx` - Comprehensive examples
- `src/hooks/usePrevious.ts` - Custom hooks
- `src/components/Projects.tsx` - Updated with new components
- `src/route.tsx` - Added new route
- `src/components/Layout.tsx` - Added navigation link
