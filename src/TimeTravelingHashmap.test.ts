import { describe, it, expect, beforeEach } from 'vitest'
import { TimeTravelingHashmap } from './TimeTravelingHashmap';

describe('initial tests', () => {
    let tth: TimeTravelingHashmap<string>
    beforeEach(() => {
        tth = new TimeTravelingHashmap<string>();
        tth.put("foo", 1, "car");
        tth.put("foo", 6, "jar");

    })
    it('get the existing item 1', () => {
        expect(tth.get("foo", 1)).toBe('car')
    })
    it('get the existing item 6', () => {
        expect(tth.get("foo", 6)).toBe('jar')
    })
    it('get a no existing item 3', () => {
        expect(tth.get("foo", 3)).toBe('car')
    })
    it('get a no existing item 8', () => {
        expect(tth.get("foo", 8)).toBe('jar')
    })
})

describe('big tests', () => {
    let tth: TimeTravelingHashmap<string>
    beforeEach(() => {
        tth = new TimeTravelingHashmap<string>();
        for (let i = 1; i < 100000; i += 100) {
            tth.put("foo", i, "car"); // nnnnxx where xx<50
            tth.put("foo", i + 50, "jar"); // nnnnxx where xx>=50
        }
    })
    it('get the existing item 1234', () => {
        expect(tth.get("foo", 1234)).toBe('car')
    })
    it('get the existing item 34567', () => {
        expect(tth.get("foo", 34567)).toBe('jar')
    })
    it('get a no existing item 76543', () => {
        expect(tth.get("foo", 76543)).toBe('car')
    })
    it('get a no existing item 87654', () => {
        expect(tth.get("foo", 87654)).toBe('jar')
    })
})