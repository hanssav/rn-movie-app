import React from 'react';
import { cn } from '@/lib/utils';
import { Platform, TextInput, View, type TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
};

export function Input({
  className,
  iconLeft,
  iconRight,
  ...props
}: InputProps) {
  return (
    <View
      className={cn(
        'dark:bg-dark-200 h-10 w-full min-w-0 flex-row items-center rounded-[30px] bg-background px-[14px] shadow-sm sm:h-9',
        className
      )}>
      {/* LEFT ICON */}
      {iconLeft && <View className="mr-2">{iconLeft}</View>}

      {/* TEXT INPUT */}
      <TextInput
        className={cn(
          'flex-1 text-base leading-5 text-foreground',
          props.editable === false &&
            cn(
              'opacity-50',
              Platform.select({
                web: 'disabled:pointer-events-none disabled:cursor-not-allowed',
              })
            ),
          Platform.select({
            web: cn(
              'outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground md:text-sm',
              'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
              'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
            ),
            native: 'dark:placeholder:text-light-200 placeholder:text-sm',
          })
        )}
        {...props}
      />

      {/* RIGHT ICON */}
      {iconRight && <View className="ml-2">{iconRight}</View>}
    </View>
  );
}
