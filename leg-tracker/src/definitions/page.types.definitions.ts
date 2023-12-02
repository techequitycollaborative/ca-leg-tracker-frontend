export type TSearchParams = {
  [key: string]: string;
};
export type TParams = {
  [key: string]: string;
};

export interface PageProps {
  params: TParams;
  searchParams: TSearchParams;
  children?: React.ReactNode;
}
