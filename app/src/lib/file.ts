type GetSize = { value: number; suffix: 'gb' | 'mb' | 'kb' | 'b' };

export const getSize = (bytes: number): GetSize => {
  if (bytes >= 1073741824) {
    return {
      value: Number((bytes / 1073741824).toFixed(2)),
      suffix: 'gb',
    };
  }

  if (bytes >= 1048576) {
    return {
      value: Number((bytes / 1048576).toFixed(2)),
      suffix: 'mb',
    };
  }

  if (bytes >= 1024) {
    return {
      value: Number((bytes / 1024).toFixed(2)),
      suffix: 'kb',
    };
  }

  return {
    value: bytes,
    suffix: 'b',
  };
};
