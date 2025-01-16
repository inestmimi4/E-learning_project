-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 16 jan. 2025 à 15:20
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `products_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `cart`
--

CREATE TABLE `cart` (
  `id_c` int(11) NOT NULL,
  `id_u` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cart`
--

INSERT INTO `cart` (`id_c`, `id_u`) VALUES
(1, 5);

-- --------------------------------------------------------

--
-- Structure de la table `cart_items`
--

CREATE TABLE `cart_items` (
  `id_items` int(11) NOT NULL,
  `id_c` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cart_items`
--

INSERT INTO `cart_items` (`id_items`, `id_c`, `id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discountPercentage` decimal(5,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `returnPolicy` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `category`, `price`, `discountPercentage`, `rating`, `stock`, `brand`, `returnPolicy`, `thumbnail`, `tags`, `duration`) VALUES
(1, 'Java Programming for Beginners', 'Learn the fundamentals of Java programming in this beginner-friendly course. Ideal for those new to programming.', 'Java', 19.99, 7.17, 4.94, 5, 'CodeAcademy', '30 days return policy', 'java.jpg', 'Java,programming,beginner,development', 4),
(2, 'Python for Data Science', 'Master Python programming for data analysis and visualization in this comprehensive course.', 'Python', 19.99, 5.50, 3.28, 44, 'Glamour Beauty', '30 days return policy', 'python.png', NULL, 5),
(6, 'Introduction to Cloud Computing', 'Learn the basics of Cloud Computing, including deployment models, service models, and cloud security. Perfect for beginners.', 'Cloud Computing', 29.99, 5.00, 4.85, 15, 'CloudAcademy', '30 days return policy', 'cloud.jpg', 'Cloud Computing,cloud services,IaaS,PaaS,SaaS', 6),
(7, 'AWS Solutions Architect Certification', 'Prepare for the AWS Solutions Architect certification exam with this in-depth course.', 'Cloud Computing', 39.99, 7.50, 4.90, 10, 'CloudGuru', 'No returns after enrollment', 'architect.jpg', 'AWS,cloud architecture,AWS certification,Amazon Web Services', 8),
(9, 'Azure Fundamentals', 'Learn how to build, manage, and deploy applications using Microsoft Azure in this beginner-friendly course.', 'Cloud Computing', 32.99, 8.00, 4.75, 18, 'Microsoft Academy', '30 days return policy', 'azure.jpg', 'Azure,cloud services,Microsoft Azure,cloud deployment', 7),
(14, 'Full-Stack Web Development with React and Node.js', 'Master both front-end and back-end development using React and Node.js in this comprehensive course.', 'Software Development', 69.99, 15.00, 4.89, 10, 'DevMasters', '30 days return policy', 'node.jpg', 'React,Node.js,Full-stack development,web development', 12),
(15, 'Building Scalable Microservices with Spring Boot', 'Learn how to design, develop, and deploy scalable microservices using Spring Boot.', 'Software Development', 59.99, 10.00, 4.75, 8, 'Spring Academy', '15 days return policy', 'spring.jpg', 'Spring Boot,Microservices,Java,scalable services', 10);

-- --------------------------------------------------------

--
-- Structure de la table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reviewerName` varchar(255) DEFAULT NULL,
  `reviewerEmail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reviews`
--

INSERT INTO `reviews` (`id`, `product_id`, `rating`, `comment`, `date`, `reviewerName`, `reviewerEmail`) VALUES
(1, 1, 2, 'Very unhappy with my purchase!', '2024-05-23 07:56:21', 'John Doe', 'john.doe@x.dummyjson.com'),
(2, 1, 2, 'Not as described!', '2024-05-23 07:56:21', 'Nolan Gonzalez', 'nolan.gonzalez@x.dummyjson.com'),
(3, 1, 5, 'Very satisfied!', '2024-05-23 07:56:21', 'Scarlett Wright', 'scarlett.wright@x.dummyjson.com'),
(4, 2, 4, 'Very satisfied!', '2024-05-23 07:56:21', 'Liam Garcia', 'liam.garcia@x.dummyjson.com'),
(5, 2, 1, 'Very disappointed!', '2024-05-23 07:56:21', 'Nora Russell', 'nora.russell@x.dummyjson.com'),
(6, 2, 5, 'Highly impressed!', '2024-05-23 07:56:21', 'Elena Baker', 'elena.baker@x.dummyjson.com'),
(12, 6, 5, 'Great introduction to cloud concepts. Highly recommended for beginners!', '2024-08-15 09:30:00', 'Alice Thompson', 'alice.thompson@x.dummyjson.com'),
(13, 6, 4, 'Good course, but could use more practical examples.', '2024-08-16 10:45:00', 'Ethan Carter', 'ethan.carter@x.dummyjson.com'),
(14, 7, 5, 'Passed my AWS Solutions Architect exam thanks to this course!', '2024-09-01 08:20:00', 'Mason Reed', 'mason.reed@x.dummyjson.com'),
(15, 7, 4, 'Very detailed and thorough, but quite challenging.', '2024-09-02 11:35:00', 'Harper Walker', 'harper.walker@x.dummyjson.com'),
(18, 9, 5, 'Azure concepts are explained very clearly. Highly recommended.', '2024-10-05 09:00:00', 'Amelia Baker', 'amelia.baker@x.dummyjson.com'),
(19, 9, 4, 'Good overview of Azure, but more real-world examples would be nice.', '2024-10-06 13:30:00', 'Logan Turner', 'logan.turner@x.dummyjson.com'),
(28, 14, 5, 'This course took my web development skills to the next level. Highly recommend it!', '2024-08-15 09:30:00', 'Oliver Thompson', 'oliver.thompson@x.dummyjson.com'),
(29, 14, 4, 'Good course, but the back-end topics could have been explained in more detail.', '2024-08-17 11:45:00', 'Charlotte Brown', 'charlotte.brown@x.dummyjson.com'),
(30, 15, 5, 'Great insights into microservices architecture with Spring Boot. Very practical and hands-on.', '2024-08-19 13:10:00', 'Henry Walker', 'henry.walker@x.dummyjson.com'),
(31, 15, 4, 'Useful course, but needed more real-world examples.', '2024-08-21 10:55:00', 'Grace Williams', 'grace.williams@x.dummyjson.com');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_u` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `username` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_u`, `name`, `email`, `password`, `username`) VALUES
(5, 'ines', 'ines@gmail.com', 'ines', 'tmimi'),
(9, 'Johnn Doe', 'john5@example.com', 'password134', 'johndoee'),
(10, 'oussama', 'oussama@gmail.com', 'ous*/14KL', 'oussama');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_c`);

--
-- Index pour la table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id_items`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_u`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cart`
--
ALTER TABLE `cart`
  MODIFY `id_c` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id_items` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_u` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
