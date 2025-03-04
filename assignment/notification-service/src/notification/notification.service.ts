import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { OnModuleInit } from '@nestjs/common';

@Injectable()
export class NotificationService implements OnModuleInit {
    private kafka = new Kafka({ brokers: ['localhost:9092'] });
    private readonly producer = this.kafka.producer();
    private readonly consumer = this.kafka.consumer({ groupId: 'kishanthan-notification-service' });

    constructor() {}
    async onModuleInit() {
        await this.producer.connect();
        await this.consumer.connect();
        await this.consumeOrderCreated();
    }

    async consumeOrderCreated() {
        await this.consumer.subscribe({ topic: 'kishanthan.order.confirmed' });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                console.log({
                    value: message.value.toString(),
                });
            },
        });
        console.log('--subscribe--kishanthan.order.confirmed-----');
    }
}
