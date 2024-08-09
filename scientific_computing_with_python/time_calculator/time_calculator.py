def add_time(start, duration, starting_day=None):
    # Days of the week list for reference
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    # Parsing start time
    start_time, period = start.split()
    start_hour, start_minute = map(int, start_time.split(":"))
    
    # Convert start hour to 24-hour format
    if period == "PM":
        start_hour += 12
    if start_hour == 12 and period == "AM":
        start_hour = 0
    
    # Parsing duration
    duration_hour, duration_minute = map(int, duration.split(":"))
    
    # Add minutes and handle overflow
    end_minute = start_minute + duration_minute
    additional_hour = end_minute // 60
    end_minute = end_minute % 60
    
    # Add hours and calculate day overflow
    end_hour = start_hour + duration_hour + additional_hour
    number_of_days = end_hour // 24
    end_hour = end_hour % 24
    
    # Convert 24-hour time back to 12-hour time with AM/PM
    if end_hour >= 12:
        period = "PM"
        if end_hour > 12:
            end_hour -= 12
    else:
        period = "AM"
        if end_hour == 0:
            end_hour = 12
    
    # Calculate final number of days passed
    total_days = number_of_days

    # Determine the final day of the week
    if starting_day:
        start_day_index = days_of_week.index(starting_day.capitalize())
        end_day_index = (start_day_index + total_days) % 7
        end_day = days_of_week[end_day_index]
    
    # Construct the final result
    new_time = f"{end_hour}:{str(end_minute).zfill(2)} {period}"
    
    if starting_day:
        new_time += f", {end_day}"
    
    if total_days == 1:
        new_time += " (next day)"
    elif total_days > 1:
        new_time += f" ({total_days} days later)"
    
    return new_time

# Test cases
print(add_time('3:30 PM', '2:12'))  # Expected: 5:42 PM
print(add_time('11:59 PM', '24:05'))  # Expected: 12:04 AM (2 days later)
print(add_time('3:30 PM', '2:12', 'Monday'))  # Expected: 5:42 PM, Monday
print(add_time('11:59 PM', '24:05', 'Wednesday'))  # Expected: 12:04 AM, Friday (2 days later)
