// Backward compatibility hook — re-exports from lib/mock-data
// Components that import from '@/hooks/useMockData' will still work
import { useMockData, products, sellers } from '@/lib/mock-data';

export { useMockData, products, sellers };
