require 'faker'

User.destroy_all
Habit.destroy_all
UserHabit.destroy_all
Friendship.destroy_all

# USER DATA
emilio = User.create(name: 'Emilio', email_address: 'emilio@gmail.com', age: 22, img_url: "img/emilio.jpg")
alex = User.create(name: 'Alex', email_address: 'alex@gmail.com', age: 34, img_url: "img/alex.jpg")
steven = User.create(name: 'Steven', email_address: 'steven@gmail.com', age: 21, img_url: "img/steven.png")
rubens = User.create(name: 'Rubens', email_address: 'rubens@gmail.com', age: 32, img_url: "img/rubens.jpg")

# EMILIO DATA
Habit.create(name: 'Meditation')
UserHabit.create(user_id: emilio.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Workout')
UserHabit.create(user_id: emilio.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Read')
UserHabit.create(user_id: emilio.id, habit_id: Habit.last.id, straight_days: 0)

# ALEX DATA
Habit.create(name: 'Cook')
UserHabit.create(user_id: alex.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Swim')
UserHabit.create(user_id: alex.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Mandarin')
UserHabit.create(user_id: alex.id, habit_id: Habit.last.id, straight_days: 0)

# STEVEN DATA
Habit.create(name: 'Coding')
UserHabit.create(user_id: steven.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Blogging')
UserHabit.create(user_id: steven.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'More Coding')
UserHabit.create(user_id: steven.id, habit_id: Habit.last.id, straight_days: 0)

# RUBENS DATA
Habit.create(name: 'Coding')
UserHabit.create(user_id: rubens.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Find cool memes')
UserHabit.create(user_id: rubens.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Running')
UserHabit.create(user_id: rubens.id, habit_id: Habit.last.id, straight_days: 0)




