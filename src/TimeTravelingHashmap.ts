
export type StringHash<T> = Record<string, NumberHash<T>[]>;
export interface NumberHash<T> {
    timestamp: number
    value: T
}
export interface BinarySearchResult {
    found: boolean;
    index: number
}

export function TimeTravelingHashmap<T>() {
    const memory: StringHash<T> = {};
    return {
        put(stringKey: string, numberKey: number, valueToBeInserted: T) {

            let memoryForTheStringKey = memory[stringKey];
            if (!memoryForTheStringKey) {
                memory[stringKey] = [{ timestamp: numberKey, value: valueToBeInserted }];
                return;
            }

            const numberHashCompareResult = binarySearch(memoryForTheStringKey, numberKey);
            if (numberHashCompareResult.found) {
                memoryForTheStringKey[numberHashCompareResult.index].value = valueToBeInserted;
            } else {
                memory[stringKey] = [
                    ... memory[stringKey].splice(0, numberHashCompareResult.index),
                    { timestamp: numberKey, value: valueToBeInserted },
                    ... memory[stringKey].slice(numberHashCompareResult.index)
                ]
            }
        },
        get(stringKey: string, numberKey: number) {
            let memoryForTheStringKey = memory[stringKey];
            if (!memoryForTheStringKey) return null;
            const { found, index } = binarySearch(memoryForTheStringKey, numberKey);
            const memoryForTheItem = memoryForTheStringKey[found ? index : index - 1];
            if (!memoryForTheItem) return null;
            return memoryForTheItem.value;
        }
    }
}

function binarySearch<T>(arr: NumberHash<T>[], item: number): BinarySearchResult {
    let low = 0;
    let high = arr.length - 1;
    let mid: number = -1;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        const result = arr[mid].timestamp - item;
        if (result === 0) {
            return {
                found: true,
                index: mid,
            }
        }
        if (result < 0) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return {
        found: false,
        index: low,
    }
}