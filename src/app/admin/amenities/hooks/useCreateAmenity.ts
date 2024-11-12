import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAmenityAction } from "../action";
import { AMENITIES_QUERY_KEY } from "../static";


export const useCreateAmenity = (onSuccess: () => void, onError: (error: Error) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAmenityAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AMENITIES_QUERY_KEY });
      onSuccess();
    },
    onError: (error) => {
      onError(error);
    },
  })
}
