-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-5.7
-- Время создания: Июн 01 2024 г., 17:18
-- Версия сервера: 5.7.44
-- Версия PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `todos_express`
--

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `UserId` int(11) NOT NULL,
  `ToId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `body`, `UserId`, `ToId`, `created_at`) VALUES
(1, 'adadada', 11, 12, '2024-06-01 13:16:46'),
(2, 'TEST', 11, 12, '2024-06-01 13:18:56'),
(3, 'adada', 11, 12, '2024-06-01 13:24:59'),
(4, 'aaaaaaaaaaaaaaaaa', 11, 12, '2024-06-01 13:25:42'),
(5, 'adadadadadadadadadadada', 11, 12, '2024-06-01 13:27:05'),
(6, 'фвфвфвф', 11, 12, '2024-06-01 13:29:32'),
(7, 'adadad', 11, 12, '2024-06-01 13:30:48'),
(8, 'adaad', 11, 12, '2024-06-01 13:32:05'),
(9, 'adadad', 11, 12, '2024-06-01 13:33:31'),
(10, 'ANSWER', 11, 11, '2024-06-01 13:36:37'),
(11, 'ABS', 11, 12, '2024-06-01 13:36:53'),
(12, 'ANSWER', 12, 11, '2024-06-01 13:37:20'),
(13, 'adadadad', 12, 11, '2024-06-01 13:38:35'),
(14, 'adadad', 12, 11, '2024-06-01 13:39:12'),
(15, 'FFF', 12, 11, '2024-06-01 13:42:40'),
(16, 'adadad', 12, 11, '2024-06-01 13:44:12'),
(17, 'adadada', 12, 11, '2024-06-01 13:44:58'),
(18, 'adadada', 12, 11, '2024-06-01 13:46:37'),
(19, 'adadadada', 12, 11, '2024-06-01 13:47:06'),
(20, 'adadada', 12, 11, '2024-06-01 13:47:38'),
(21, 'etretete', 12, 11, '2024-06-01 13:49:27'),
(22, 'adadadada', 12, 12, '2024-06-01 13:50:25'),
(23, 'adadad', 12, 11, '2024-06-01 13:50:30'),
(24, 'AADDADAD', 12, 12, '2024-06-01 13:50:51'),
(25, 'ADdad', 12, 11, '2024-06-01 13:50:55'),
(26, 'adadad', 12, 11, '2024-06-01 13:50:58');

-- --------------------------------------------------------

--
-- Структура таблицы `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `done` tinyint(1) NOT NULL,
  `UserId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `todos`
--

INSERT INTO `todos` (`id`, `title`, `body`, `done`, `UserId`, `created_at`, `updated_at`) VALUES
(1, 'TASK 111', 'GGGGGGOOOOOO', 0, 1, '2024-05-23 06:53:43', '2024-05-23 06:53:43'),
(2, 'TASK 222', 'FFFOOOOLLL', 0, 2, '2024-05-23 06:54:06', '2024-05-23 06:54:06'),
(3, 'TASK 222', 'HELLO WORLD', 0, 2, '2024-05-23 06:54:26', '2024-05-23 06:54:26'),
(6, 'DDDDDDD', 'AAADadadadadadadadadad', 0, 1, '2024-05-23 16:45:21', '2024-05-23 16:52:08');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `password`, `created_at`, `updated_at`) VALUES
(1, 'yui@gmaol.com', 'Kavasaki', 'Yuichiro', '13123', '2024-05-23 07:24:10', '2024-05-31 15:56:51'),
(2, 'test12@ddd.com', 'Eva', 'Wood', '2323', '2024-05-23 07:24:10', '2024-05-31 15:56:55'),
(3, 'jane@mail.com', 'Jane', 'Doe', '23213', '2024-05-23 07:34:48', '2024-05-31 15:56:58'),
(11, 'test@gmail.com', 'Затычка', 'Затычка', 'f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae', '2024-06-01 10:44:16', '2024-06-01 10:44:16'),
(12, 'test1@gmail.com', 'Затычка', 'Затычка', 'f6e0a1e2ac41945a9aa7ff8a8aaa0cebc12a3bcc981a929ad5cf810a090e11ae', '2024-06-01 12:35:15', '2024-06-01 12:35:15');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `messages_ibfk_2` (`ToId`);

--
-- Индексы таблицы `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorID` (`UserId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`ToId`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `todos`
--
ALTER TABLE `todos`
  ADD CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
