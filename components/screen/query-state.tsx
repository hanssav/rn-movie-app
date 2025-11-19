import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { LoadingSpinner } from '@/components/ui/loading';

type QueryStateProps = {
  loading?: boolean;
  error?: string | null;
  loaderHeight?: number;
  children: React.ReactNode;
  CustomLoader?: React.ReactNode;
  CustomError?: React.ReactNode;
};

const QueryState: React.FC<QueryStateProps> = ({
  loading,
  error,
  loaderHeight = 300,
  children,
  CustomLoader,
  CustomError,
}) => {
  if (loading) {
    return CustomLoader ? (
      CustomLoader
    ) : (
      <View
        className="flex-1 items-center justify-center"
        style={{ height: loaderHeight }}>
        <LoadingSpinner />
      </View>
    );
  }

  if (error) {
    return CustomError ? (
      CustomError
    ) : (
      <View className="flex-1 items-center justify-center px-5">
        <Text variant="error">Error: {error}</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default QueryState;
// <QueryState
//   loading={isLoading || isPopularLoading}
//   error={error?.message || errorPopular?.message}>

// ============ EXAMPLE PROPS WITH CUSTOM LOADER OR ERROR ============
// CustomLoader={
//   <View className="py-20">
//     <LoadingSpinner size="large" />
//   </View>
// }
// CustomError={<Text variant={'error'}>Failed to load data</Text>}
// </QueryState>
