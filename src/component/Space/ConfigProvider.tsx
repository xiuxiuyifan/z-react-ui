import React from "react";
import type { SizeType } from ".";

export interface ConfigContextProps {
  space?: {
    size?: SizeType;
  };
}

export const ConfigContext = React.createContext<ConfigContextProps>({});

export const ConfigProvider: React.FC<ConfigContextProps> = (props) => {
  const { children, space } = props;
  return (
    <ConfigContext.Provider value={{ space }}>
      {children}
    </ConfigContext.Provider>
  );
};
