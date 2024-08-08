def arithmetic_arranger(problems, display_answers=False):
    if len(problems) > 5:
        return "Error: Too many problems."

    first_operands = []
    operators = []
    second_operands = []
    results = []
    max_lengths = []

    for problem in problems:
        parts = problem.split()
        first_operand = parts[0]
        operator = parts[1]
        second_operand = parts[2]

        if operator not in ['+', '-']:
            return "Error: Operator must be '+' or '-'."
        
        if not (first_operand.isdigit() and second_operand.isdigit()):
            return "Error: Numbers must only contain digits."
        
        if len(first_operand) > 4 or len(second_operand) > 4:
            return "Error: Numbers cannot be more than four digits."

        max_length = max(len(first_operand), len(second_operand)) + 2
        max_lengths.append(max_length)

        first_operands.append(first_operand.rjust(max_length))
        operators.append(operator)
        second_operands.append(operator + " " + second_operand.rjust(max_length - 2))

        if display_answers:
            if operator == '+':
                result = str(int(first_operand) + int(second_operand))
            else:
                result = str(int(first_operand) - int(second_operand))
            results.append(result.rjust(max_length))

    # Formatting each line
    line1 = '    '.join(first_operands)
    line2 = '    '.join(second_operands)
    line3 = '    '.join(['-' * length for length in max_lengths])
    arranged_problems = line1 + '\n' + line2 + '\n' + line3

    if display_answers:
        line4 = '    '.join(results)
        arranged_problems += '\n' + line4

    return arranged_problems

# Example usage:
if __name__ == "__main__":
    print(arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"]))
    print(arithmetic_arranger(["32 + 8", "1 - 3801", "9999 + 9999", "523 - 49"], True))
