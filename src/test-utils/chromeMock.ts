type StorageState = {
  history: boolean;
  pwds: string[];
};

export function createChromeMock(initial: Partial<StorageState> = {}) {
  const storage: StorageState = {
    history: false,
    pwds: [],
    ...initial,
  };

  const chromeMock = {
    storage: {
      sync: {
        get: jest.fn(
          (keys: string | string[], cb: (result: Partial<StorageState>) => void) => {
            const keyList = Array.isArray(keys) ? keys : [keys];
            const result: Partial<StorageState> = {};

            keyList.forEach((key) => {
              if (key in storage) {
                result[key as keyof StorageState] = storage[
                  key as keyof StorageState
                ] as never;
              }
            });

            cb(result);
          }
        ),
        set: jest.fn((data: Partial<StorageState>, cb?: () => void) => {
          Object.assign(storage, data);
          if (cb) cb();
        }),
      },
    },
    getStorage: () => ({ ...storage }),
  };

  return chromeMock;
}

export function installChromeMock(initial?: Partial<StorageState>) {
  const mock = createChromeMock(initial);
  Object.defineProperty(global, "chrome", {
    value: mock,
    writable: true,
    configurable: true,
  });
  return mock;
}
