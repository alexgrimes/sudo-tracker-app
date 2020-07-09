require 'faker'

User.destroy_all
Habit.destroy_all
UserHabit.destroy_all
Friendship.destroy_all

# USER DATA
emilio = User.create(name: 'Emilio', email_address: 'emilio@gmail.com', age: 22, img_url: "img/img_1.jpg")
alex = User.create(name: 'Alex', email_address: 'alex@gmail.com', age: 34, img_url: "img/img_2.jpg")
steven = User.create(name: 'Steven', email_address: 'steven@gmail.com', age: 21, img_url: "img/img_3.jpg")
daniela = User.create(name: 'Daniela', email_address: 'daniela@gmail.com', age: 32, img_url: "https://www.w3schools.com/images/lamp.jpg")

# USER 1 DATA
Habit.create(name: 'Meditation')
UserHabit.create(user_id: emilio.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Workout')
UserHabit.create(user_id: emilio.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Read')
UserHabit.create(user_id: emilio.id, habit_id: Habit.last.id, straight_days: 0)

# USER 2 DATA
Habit.create(name: 'Meditation')
UserHabit.create(user_id: alex.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Workout')
UserHabit.create(user_id: alex.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Read')
UserHabit.create(user_id: alex.id, habit_id: Habit.last.id, straight_days: 0)

# USER 3 DATA
Habit.create(name: 'Meditation')
UserHabit.create(user_id: steven.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Workout')
UserHabit.create(user_id: steven.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Read')
UserHabit.create(user_id: steven.id, habit_id: Habit.last.id, straight_days: 0)

# USER 3 DATA
Habit.create(name: 'Meditation')
UserHabit.create(user_id: daniela.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Workout')
UserHabit.create(user_id: daniela.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Read')
UserHabit.create(user_id: daniela.id, habit_id: Habit.last.id, straight_days: 0)


# FRIENDSHIP DATA


