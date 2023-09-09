import request from "@/utils/request";

export const getVisualization = () => {
  return request({
    url: import.meta.env.VITE_APP_BASE_API + "/visualization",
  }) as Promise<VisualizationData>;
};

export type VisualizationData = {
  regionData: {
    regions: Array<{ id: number; name: string; value: number }>;
  };
  serverData: {
    servers: Array<{ id: number; name: string; value: number }>;
  };
  riskData: {
    risks: Array<{ id: number; name: string; value: number }>;
  };
  abnormalData: {
    abnormals: Array<{ id: number; name: string; value: number }>;
  };
  relationData: {
    relations: Array<{
      id: number;
      name: string;
      source: string;
      target: string;
      speed: number;
      value: number[];
    }>;
  };
  wordCloudData: {
    datas: Array<{ value: number; name: string }>;
  };
  totalData: {
    total: string;
    hb: string;
    db: string;
    hd: string;
    zn: string;
    xn: string;
    xb: string;
  };
  mapData: {
    voltageLevel: string[];
    colors: string[];
    categoryData: Record<number, Array<{ name: string; value: number }>>;
    topData: Record<number, Array<{ name: string; value: number[] }>>;
  };
};
