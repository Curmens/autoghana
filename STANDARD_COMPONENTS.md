# Standard Components System

This document outlines the standardized component system for consistent UI/UX across the AutoGhana app.

## Overview

The standard components system provides:
- **Consistent styling** across all screens
- **DRY code principles** with reusable components
- **Standardized spacing, colors, and typography**
- **Easy maintenance** and updates

## Files Structure

```
app/
├── styles/
│   └── globalStyles.ts          # Global style definitions
components/
└── StandardComponents.tsx       # Reusable standard components
```

## Global Styles (`app/styles/globalStyles.ts`)

### Layout Constants
- `LAYOUT.padding` - Standard padding values for pages, sections, cards, forms
- `LAYOUT.spacing` - Standard spacing between elements
- `LAYOUT.borderRadius` - Standard border radius values

### Style Categories
- `pageStyles` - Page-level container styles
- `headerStyles` - Header component styles (based on homepage header)
- `cardStyles` - Card component styles (based on homepage ThemeCard)
- `inputStyles` - Input field styles (based on login page inputs)
- `buttonStyles` - Button styles with primary/ghost variants
- `fabStyles` - Floating Action Button styles
- `sectionStyles` - Section layout styles
- `formStyles` - Form container and field styles
- `emptyStateStyles` - Empty state component styles
- `badgeStyles` - Badge/status indicator styles

## Standard Components (`components/StandardComponents.tsx`)

### Layout Components

#### `StandardPage`
Main page container with consistent background and safe area handling.
```tsx
<StandardPage safeArea={true} backgroundColor={theme.colors.background}>
  {children}
</StandardPage>
```

#### `StandardContent`
Scrollable content container with consistent padding.
```tsx
<StandardContent scrollable={true}>
  {children}
</StandardContent>
```

#### `StandardSection`
Section container with title/subtitle and consistent spacing.
```tsx
<StandardSection title="Section Title" subtitle="Optional subtitle">
  {children}
</StandardSection>
```

### Header Components

#### `StandardHeader`
Consistent header with title, subtitle, and action buttons.
```tsx
<StandardHeader
  title="Page Title"
  subtitle="Optional subtitle"
  rightAction={<HeaderAction icon="notifications" onPress={handleNotifications} />}
  leftAction={<HeaderAction icon="menu" onPress={handleMenu} />}
/>
```

#### `HeaderAction`
Standard header action button.
```tsx
<HeaderAction
  icon="notifications"
  onPress={handlePress}
  accessibilityLabel="Notifications"
/>
```

### Form Components

#### `StandardInput`
Consistent input field with label, icons, and error handling.
```tsx
<StandardInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="you@example.com"
  keyboardType="email-address"
  leftIcon="email-outline"
  rightIcon="eye-outline"
  onRightIconPress={toggleVisibility}
  error={emailError}
/>
```

#### `StandardButton`
Consistent button with primary/ghost variants.
```tsx
<StandardButton
  title="Sign In"
  onPress={handleLogin}
  loading={isLoading}
  variant="primary"
/>
```

#### `StandardForm`
Form container with consistent spacing.
```tsx
<StandardForm>
  <StandardInput ... />
  <StandardInput ... />
  <StandardButton ... />
</StandardForm>
```

### UI Components

#### `StandardCard`
Consistent card styling based on homepage ThemeCard.
```tsx
<StandardCard onPress={handlePress}>
  <View style={{ padding: 20 }}>
    {content}
  </View>
</StandardCard>
```

#### `StandardFAB`
Floating Action Button with consistent positioning.
```tsx
<StandardFAB
  label="Add Item"
  onPress={handleAdd}
  icon="add"
/>
```

#### `Badge`
Status/info badge with optional dot indicator.
```tsx
<Badge text="Good condition" color={theme.colors.success} />
<Badge text="Info only" showDot={false} />
```

#### `EmptyState`
Consistent empty state with icon, text, and optional action.
```tsx
<EmptyState
  icon="info"
  title="No data available"
  subtitle="There's nothing to show here yet."
  actionTitle="Add Content"
  onAction={handleAddContent}
/>
```

## Usage Guidelines

### 1. Always Use Standard Components
Replace custom implementations with standard components:
```tsx
// ❌ Don't do this
<View style={{ padding: 20, backgroundColor: '#fff' }}>
  <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Title</Text>
</View>

// ✅ Do this instead
<StandardSection title="Title">
  {content}
</StandardSection>
```

### 2. Consistent Spacing
Use the global layout constants:
```tsx
import { LAYOUT } from '../app/styles/globalStyles';

// Use standard padding
<View style={{ padding: LAYOUT.padding.card }}>
```

### 3. Form Layouts
Always wrap form fields in `StandardForm`:
```tsx
<StandardForm>
  <StandardInput label="Name" value={name} onChangeText={setName} />
  <StandardInput label="Email" value={email} onChangeText={setEmail} />
  <StandardButton title="Submit" onPress={handleSubmit} />
</StandardForm>
```

### 4. Page Structure
Follow this consistent page structure:
```tsx
export default function MyScreen() {
  return (
    <StandardPage>
      <StandardHeader title="My Screen" />
      <StandardContent>
        <StandardSection title="Section 1">
          <StandardCard>
            {content}
          </StandardCard>
        </StandardSection>
      </StandardContent>
      <StandardFAB label="Add" onPress={handleAdd} />
    </StandardPage>
  );
}
```

## Benefits

1. **Consistency** - All screens look and feel the same
2. **Maintainability** - Update styles in one place
3. **Developer Experience** - Less code to write, fewer decisions to make
4. **Performance** - Reused styles are optimized
5. **Accessibility** - Built-in accessibility features

## Migration Guide

To migrate existing screens:

1. Replace page containers with `StandardPage`
2. Replace headers with `StandardHeader`
3. Replace form inputs with `StandardInput`
4. Replace buttons with `StandardButton`
5. Wrap content in `StandardContent` and `StandardSection`
6. Replace FABs with `StandardFAB`
7. Use `StandardCard` for card layouts

## Example

See `app/example-usage.tsx` for a complete example of using all standard components.