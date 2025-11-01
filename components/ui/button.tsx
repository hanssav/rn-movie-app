import { cn } from '@/lib/cn';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

const buttonVariants = cva(
  'px-6 py-3 rounded-full items-center justify-center',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600',
        secondary: 'bg-gray-200',
        outline: 'border-2 border-blue-600 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

const buttonTextVariants = cva('font-semibold text-base', {
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'text-gray-800',
      outline: 'text-blue-600',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  className?: string;
  textClassName?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant,
  className,
  textClassName,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    >
      <Text className={cn(buttonTextVariants({ variant }), textClassName)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
