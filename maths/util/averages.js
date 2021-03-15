module.exports = { mean, median, mode };

/**
 * Calculates the mean of a specific list of numbers. The mean is the average value, calculated by taking the sum of the numbers and dividing that by the amount of numbers added together.
 * @param {Number[]} nums Array of Numbers. Doesn't need to be sorted.
 * @returns {Number} Mean of the inputted list of numbers
 */
function mean(nums) {
	let total = nums.reduce((acc, val) => acc + val);
	return total / nums.length;
}

/**
 * Calculates the median of a specific list of numbers. The median is the middle value of the list.
 * @param {Number[]} nums Array of Numbers. Needs to be sorted.
 * @returns {Number} Median of the inputted list of numbers
 */
function median(nums) {
	if (nums.length % 2 !== 0) return nums[(nums.length - 1) / 2];
	let half = nums.length / 2;
	return mean([nums[half - 1], nums[half]]);
}

/**
 * Calculates the mode of a specific list of numbers. The mode is the most frequently appearing value in the list.
 * @param {Array} nums Array of Numbers. Doesn't need to be sorted.
 * @param {Boolean} [amount=false] Indicates whether the amount of that value occuring should be returned as well. Defaults to `false`. If set to `true`, the amount will be at the first index of the returned array.
 * @returns {Array} All values, that are the mode. If `single === true`, the array will be like this: `[amount, [values]]`
 */
function mode(nums, amount = false) {
	let map = new Map(),
		highest = 0,
		vals = [];
	nums.forEach((val) => {
		let n = map.get(val);
		if (!n) map.set(val, 1);
		else map.set(val, n + 1);
		n ? n++ : (n = 1);
		if (n === highest) vals.push(val);
		else if (n > highest) {
			vals = [val];
			highest = n;
		}
	});
	if (amount) return [highest, vals];
	else return vals;
}
