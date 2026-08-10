import 'package:flutter/material.dart';

enum OrderStage { inProgress, measurements, ready, delivered }

class Order {
  const Order({
    required this.id,
    required this.customer,
    required this.garment,
    required this.due,
    required this.stage,
    required this.progress,
  });

  final String id;
  final String customer;
  final String garment;
  final String due;
  final OrderStage stage;
  final int progress; // 0..100

  Color get stageColor => switch (stage) {
        OrderStage.ready => const Color(0xFF4CD9A0),
        OrderStage.delivered => const Color(0xFF52D6F2),
        _ => const Color(0xFFFFC24D),
      };

  String get stageLabel => switch (stage) {
        OrderStage.inProgress => 'In progress',
        OrderStage.measurements => 'Measurements',
        OrderStage.ready => 'Ready',
        OrderStage.delivered => 'Delivered',
      };
}

class StatCard {
  const StatCard({
    required this.label,
    required this.value,
    required this.delta,
    required this.icon,
    required this.tint,
  });

  final String label;
  final String value;
  final String delta;
  final IconData icon;
  final Color tint;
}
