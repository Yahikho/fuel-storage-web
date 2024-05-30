import { ref, Ref, UnwrapRef } from 'vue';

type RequestOptions = {
    headers?: Record<string, string>;
    body?: any;
};

export async function useFetch<T>(url: string, method: 'GET' | 'POST' = 'GET', options?: RequestOptions) {

    const data: Ref<UnwrapRef<T> | null> = ref(null);
    const error = ref<string | null>(null);
    const isLoading = ref<boolean>(false);

    const fetchData = async () => {
        isLoading.value = true;
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...options?.headers,
                },
                body: options?.body ? JSON.stringify(options.body) : null,
            });

            data.value = await response.json() as UnwrapRef<T>;

        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            isLoading.value = false;
        }
    };

    await fetchData();

    return { data, error, isLoading };
}
